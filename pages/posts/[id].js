//if you want to statically generate a page at a path called /posts/<id> where <id> can be dynamic ,create a page at /pages/posts/[id].js
// the url is made from the file where [id].js is inside (/posts) and then '/' and the id of the file to be posted
import Layout from '../../components/layout';
import {getAllPostsIds  , getPostData } from './posts'
import Head from 'next/head';
import Date from '../../components/date';

// this import is for styling the output 
import utilStyles from '../../styles/utils.module.css';



//getStaticProps is given params, which contains id (because the file name is [id].js).
//fetches necessary data for the post with 'id' 

//How does params.id from getStaticProps({ params }) know the key is named id?
// answer : The value from the file name
export async function getStaticProps ( {params} ) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData, 
        }
    };
}
// Return a list of possible value for id
export async function getStaticPaths() {
    const paths = getAllPostsIds();
    //console.log(paths);
    //console.log(process.cwd());
    return {
        paths,
        fallback: false ,
    };
} 

export default function Post( {postData} ) {
    return (
    <Layout>
        <Head>
            <title> {postData.title} </title>
        </Head>        
        <article>
            <h1 className= {utilStyles.headingX1}> {postData.title}  </h1>
            <div className= {utilStyles.lightText } >   
                <Date dateString= {postData.date} />   
            </div>
            <div dangerouslySetInnerHTML={ { __html : postData.contentHtml}} />
        </article>
    </Layout>
    );
}