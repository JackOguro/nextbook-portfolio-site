// app/blog/page.js

import Link from 'next/link'
import Image from 'next/image'
import Pagination from "../components/pagination"
import { getAllBlogs, blogsPerPage } from "../utils/mdQueries"

export const metadata = {
    title: "コンタクト",
    description: "これはコンタクトページです",
}

// async function getAllBlogs() {
//     // マークダウンの入った"data"フォルダへとアクセスし、そのデータを"files"に格納する
//     // readdirでディレクトリを読み込む
//     const files = fs.readdirSync(path.join("data"))
    
//     //console.log("ファイル",files)
    
//     const blogs = files.map((fileName) => {
//         // replace()はカッコの1つ目に削除したい文字、2つ目に置き換えたい文字列
//         const slug = fileName.replace(".md", "")
//         // fsのreadFileSyncを使用しfileを読み込む
//         const fileData = fs.readFileSync(
//             path.join("data", fileName),
//             "utf-8"
//         )
//         //console.log("ファイルの中身",fileData)

//         // マークダウンデータを読み込む
//         const { data } = matter(fileData)

//         // blogsへ格納
//         return {
//             // フロント部分のみデータを格納
//             frontmatter: data,
//             // slugはURLの一部を指す言葉
//             // http://localhost:3000/blog/first-blogの場合は/first-blogがslugになる
//             slug: slug, 
//         }
//     })

//     const orderedBlogs = blogs.sort((a, b) => {
//         return b.frontmatter.id - a.frontmatter.id
//     })

//     // getAllBlogsへ格納
//     return {
//         blogs: orderedBlogs
//     }
// }

const Blog = async() => {
    //getAllBlogs()
    const { blogs, numberPages } = await getAllBlogs()
    const limitedBlogs = blogs.slice(0, blogsPerPage)
    //console.log("記事全体",blogs)
    return (
        <>
            <div className="wrapper">
                <div className="container">
                    <h1>Blog</h1>
                    <p>エンジニアの日常生活をお届けします</p>
                        {limitedBlogs.map((blog, index) => 
                            <div key={index} className="blogCard">
                                <div className="cardContainer">
                                    <h2>{blog.frontmatter.title}</h2>
                                    <p>{blog.frontmatter.excerpt}</p>
                                    <p>{blog.frontmatter.date}</p>
                                    <Link href={`/blog/${blog.slug}`}>Read More</Link>
                                </div>
                                <div className="blogImg">
                                    <Image src={blog.frontmatter.image} alt="card-image" height={300} width={1000} quality={90} priority={true}></Image>
                                </div>
                            </div>
                        )}
                </div>
                <Pagination numberPages={numberPages} /> 
            </div>
        </>
    )
}

export default Blog