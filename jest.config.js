module.exports = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transform: {
        '^.+\\.svelte$': 'svelte-jester'
    },
    moduleFileExtensions: ['js', 'svelte'],
};
