import axios from 'axios';
import base64 from 'base-64';



export const getRepo = async (url) => {
    const turl = 'https://api.github.com/repos/stahlhammer88/dropdown/contents/src/index.js';
    const content = await axios.get(turl).then(response => response.data.content);
    const encodedLines = base64.decode(content).split("\n");
    const lines = {
        overall: 0,
        code: 0,
        empty: 0
    }    
    encodedLines.forEach(line => {
        if (!line) lines.empty++;
    });
    lines.overall = encodedLines.length;
    lines.code = lines.overall - lines.empty;
    console.log(lines);
}