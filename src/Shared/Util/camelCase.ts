/**
 * Converts a dash or snake-case string to camel case.
 */

function camelCase(str: string): string {
    return str.toLowerCase()
        .replace(/([_-][a-z0-9])/g, $1 => $1.toUpperCase().replace(/[_-]/, ''));
}

export default camelCase;