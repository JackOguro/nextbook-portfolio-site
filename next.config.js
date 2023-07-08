/** @type {import('next').NextConfig} */
const nextConfig = {
    // マークダウンファイルを読み込めるよう記述する
    webpack: function (config) {
        config.module.rules.push({
            test: /\.md$/,
            use: "raw-loader",
        })
        return config
    },
}

module.exports = nextConfig
