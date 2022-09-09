module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'amd': true,
        'node': true
    },
    'extends': ['eslint:recommended', 'prettier'],
    'parserOptions': {
        'ecmaVersion': 12,
        'sourceType': 'module'
    },
    'rules': {
        'no-console': 'error'
    }
};
