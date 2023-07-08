// [slug]/page.js

import Image from 'next/image'
import ReactMarkdown from "react-markdown" // マークダウンファイルの本文部分の表示に必要
import PrevNext from '../../components/prevNext'
import { getAllBlogs, getSingleBlog } from "../../utils/mdQueries"

export async function generateMetadata(props) {
    const { singleDocument } = await getSingleBlog(props)
    return {
        title: singleDocument.data.title,
        description: singleDocument.data.excerpt,
    }
}

// getSingleBlogに渡したpropsはcontextという名前で受け取る
// async function getSingleBlog(context) {
//     const { slug } = context.params
//     const data = await import(`../../../data/${slug}.md`)
//     const singleDocument = matter(data.default)

//     return {
//         singleDocument: singleDocument
//     }
// }

const SingleBlog = async (props) => {
    //console.log("記事のURL", props)
    const { singleDocument } = await getSingleBlog(props)
    //console.log(singleDocument)
    const { blogs } = await getAllBlogs()
    const prev = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id - 1)
    const next = blogs.filter(blog => blog.frontmatter.id === singleDocument.data.id + 1) 
    return (
        <>
            <div className="img-container">
                <Image src={singleDocument.data.image} alt="blog-image" height={500} width={1000} quality={90} priority={true}></Image>
            </div>
            <div className="wrapper">
                <div className="container">
                    <h1>{singleDocument.data.title}</h1>
                    <p>{singleDocument.data.data}</p>
                    <ReactMarkdown>{singleDocument.content}</ReactMarkdown>
                </div>
                <PrevNext prev={prev} next={next}/>
            </div>
        </>
    )
}

export default SingleBlog

export async function generateStaticParams() {

    // async function getAllBlogs() {
    //     // マークダウンの入った"data"フォルダへとアクセスし、そのデータを"files"に格納する
    //     // readdirでディレクトリを読み込む
    //     const files = fs.readdirSync(path.join("data"))
        
    //     //console.log(files)
        
    //     const blogs = files.map((fileName) => {
    //         // replace()はカッコの1つ目に削除したい文字、2つ目に置き換えたい文字列
    //         const slug = fileName.replace(".md", "")
    //         // fsのreadFileSyncを使用しfileを読み込む
    //         const fileData = fs.readFileSync(
    //             path.join("data", fileName),
    //             "utf-8"
    //         )
    //         //console.log(fileData)
    
    //         const { data } = matter(fileData)
    
    //         return {
    //             frontmatter: data,
    //             // slugはURLの一部を指す言葉
    //             // http://localhost:3000/blog/first-blogの場合は/first-blogがslugになる
    //             slug: slug, 
    //         }
    //     })
    //     return {
    //         blogs: blogs
    //     }
    // }

    // blogsにはslugだけでなく記事データも格納されている
    const { blogs } = await getAllBlogs()
    const paths = blogs.map((blog) =>`/${blog.slug}`)
    return paths
}