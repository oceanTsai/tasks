const path = require('path');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        // 解析模組時，優先收尋的路徑
        modules: [
            resolve('resources'),
            resolve('node_modules'),
        ],
        // 別名
        alias: {
            '@entry': resolve('resources/entry'),
            '@nextJs': resolve('resources/js'),
            '@proxy': resolve('resources/js/proxy'),
            '@adapter': resolve('resources/js/adapter'),
            '@react': resolve('resources/react'),
            '@actions': resolve('resources/react/actions'),
            '@components': resolve('resources/react/components'),
            '@containers': resolve('resources/react/containers'),
            '@store': resolve('resources/react/store'),
        },
    },
    // 最小化
    optimization: {
        minimize: false,
    },
};
