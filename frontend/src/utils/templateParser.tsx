export function parseTemplate ( template : string, data : any): string {
    let result = template;

    for (let key in data) {
        result = result.replace(`{{${key}}}`, data[key]);
    }

    return result;
}