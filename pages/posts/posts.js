import fs from 'fs';
import path from 'path';
import matter from 'gray-matter'; //is used to parse metadate from .md files
import {remark} from 'remark';
import html from 'remark-html';

// current working directory posts folder 
const postsDirectory = path.join(process.cwd(),'posts');

export function getSortedPostsData() {
    //get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        //remove ".md" from file name to get it 
        const id = fileName.replace(/\.md$/ , '');
        
        // read markdown file as string 
        const fullPath = path.join(postsDirectory , fileName) ;
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        //use gray matter to parse the post metadata section 
        const matterResult = matter(fileContents);

        // combine data with the id 
        return {
            id, 
            ...matterResult.data,
        };
    });

    // sort posts by date 
    return allPostsData.sort(( {date:a} , {date:b} ) => {
        if(a<b)       {return  1;}
        else if (a>b) {return -1;}
        else          {return  0;}
    })
}

export function getAllPostsIds() {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames.map( (fileName) => {
        return {
            params : {
                id : fileName.replace(/\.md$/, ''),
            },
        }
    });

}
export async function getPostData(id) {
    const fullPath = path.join(postsDirectory , `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        id,
        contentHtml,
        ...matterResult.data,
    };
}