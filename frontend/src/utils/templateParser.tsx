export function parseTemplate ( template : string, data : any): string {
    let result = template;

    for (let key in data) {
        result = result.replaceAll(`{{${key}}}`, data[key]);
    }

    return result;
}