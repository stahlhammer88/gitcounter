import axios from 'axios';
import base64 from 'base-64';
import uniqid from 'uniqid';

const baseUrl = 'https://api.github.com/repos/';
const auth = '?client_id=97cec6e85dc5b333793e&client_secret=67eb654765fc6a7409e0d292b67f184b66ee86bb';

export const getRepo = async (url) => {    
    const pathname = url.split('/github.com/')[1];
    const username = pathname.split('/')[0];
    let reponame = pathname.split('/')[1];
    if(reponame.endsWith('.git'))
        reponame = reponame.split('.')[0];

    const repoUrl = `${baseUrl}${username}/${reponame}/branches/master${auth}`;

    const sha = await axios.get(repoUrl).then(res => res.data.commit.sha);
    const treeUrl = `${baseUrl}${username}/${reponame}/git/trees/${sha}${auth}&recursive=1`;    

    const tree = await axios.get(treeUrl).then(res => res.data.tree);

    const blobs = tree.filter(item => item.type === "blob");
    
    let fileLinesData = await Promise.all(buildDataObject(blobs));   
        
    return fileLinesData;    
}

const buildDataObject = (blobs) => {    
    return blobs.map(async (blob) => {
        let fileData = {
            _id: uniqid(),
            fileName: '',
            overall: 0,
            empty: 0,
            code: 0,
            comment: 0,
        };
        const fileName = blob.path.split('/').reverse()[0];
        fileData.fileName = fileName;

        const content = await axios.get(blob.url + auth).then(res => res.data.content);
        if (content) {                
            const decoded = base64.decode(content);            
            const lineBreaks = decoded.split('\n')
            let isComment = false;
            lineBreaks.forEach(line => {
                if (!line) fileData.empty++;                
                if (line.trim().startsWith('//')) fileData.comment++;
                if (line.trim().startsWith('/*')) isComment = true;                
                if (isComment) {
                    fileData.comment++;
                }
                if (line.endsWith('*/')) {                    
                    isComment = false;
                } 
            })
            fileData.code = lineBreaks.length - fileData.empty - fileData.comment;
            fileData.overall = lineBreaks.length;
        }                     
        return fileData;  
    })    
}