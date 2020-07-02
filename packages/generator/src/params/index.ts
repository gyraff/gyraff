import inflection from 'inflection';

export function params({ args }: { args: { [k: string]: string } }): object {
    const { name } = args;
    const namePluralDashed = inflection.pluralize(name);
    const namePluralUnderscored = namePluralDashed.replace('-', '_');
    const namePluralCamelized = inflection.camelize(namePluralUnderscored);
    const namePluralCamelizedU = inflection.camelize(namePluralUnderscored, true);
    const nameSingularDashed = inflection.singularize(name);
    const nameSingularUnderscored = nameSingularDashed.replace('-', '_');
    const nameClass = inflection.classify(nameSingularUnderscored);
    return {
        nameSingularUnderscored,
        nameSingularDashed,
        namePluralDashed,
        namePluralUnderscored,
        nameClass,
        namePluralCamelized,
        namePluralCamelizedU,
    };
}
