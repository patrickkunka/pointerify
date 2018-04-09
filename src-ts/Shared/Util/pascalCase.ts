import camelCase from './camelCase';

/**
 * Converts a camel, dash or snake-case string to pascal case.
 */

function pascalCase(str: string): string {
    return (str = (str.match(/[_-]/) ? camelCase(str) : str))
        .charAt(0).toUpperCase() + str.slice(1);
}

export default pascalCase;