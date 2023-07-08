// コードの共有化

import fs from "fs"
import path from "path"
import matter from "gray-matter"

export const blogsPerPage = 5 // ページあたりに表示する記事の数

// 全てのマークダウンファイルを取得するコード(getAllBlogs)
export async function getAllBlogs() {
    // マークダウンの入った"data"フォルダへとアクセスし、そのデータを"files"に格納する
    // readdirでディレクトリを読み込む
    const files = fs.readdirSync(path.join("data"))
    
    //console.log("ファイル",files)
    
    const blogs = files.map((fileName) => {
        // replace()はカッコの1つ目に削除したい文字、2つ目に置き換えたい文字列
        const slug = fileName.replace(".md", "")
        // fsのreadFileSyncを使用しfileを読み込む
        const fileData = fs.readFileSync(
            path.join("data", fileName),
            "utf-8"
        )
        //console.log("ファイルの中身",fileData)

        // マークダウンデータを読み込む
        const { data } = matter(fileData)

        // blogsへ格納
        return {
            // フロント部分のみデータを格納
            frontmatter: data,
            // slugはURLの一部を指す言葉
            // http://localhost:3000/blog/first-blogの場合は/first-blogがslugになる
            slug: slug, 
        }
    })

    const orderedBlogs = blogs.sort((a, b) => {
        return b.frontmatter.id - a.frontmatter.id
    })

    const numberPages = Math.ceil(orderedBlogs.length / blogsPerPage) // 記事の合計数から必要なページ数

    // getAllBlogsへ格納
    return {
        blogs: orderedBlogs,
        numberPages: numberPages
    }
}

// 個別記事を取得するコード
export async function getSingleBlog(context) {
    const { slug } = context.params
    const data = await import(`../../data/${slug}.md`)
    const singleDocument = matter(data.default)

    return {
        singleDocument: singleDocument
    }
}