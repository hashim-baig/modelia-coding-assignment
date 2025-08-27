module.exports = function (plop) {
    plop.setGenerator("component", {
        description: "Generate a React component with atomic structure (TSX)",
        prompts: [
            {
                type: "list",
                name: "type",
                message: "Select component type",
                choices: ["atoms", "molecules", "organisms"],
            },
            {
                type: "input",
                name: "name",
                message: "Component name?",
            },
        ],
        actions: [
            {
                type: "add",
                path: "components/{{type}}/{{pascalCase name}}/{{pascalCase name}}Template.tsx",
                templateFile: "plop-templates/ComponentTemplate.hbs",
            },
            {
                type: "add",
                path: "components/{{type}}/{{pascalCase name}}/{{pascalCase name}}.tsx",
                templateFile: "plop-templates/Component.hbs",
            },
            {
                type: "add",
                path: "components/{{type}}/{{pascalCase name}}/index.ts",
                templateFile: "plop-templates/index.hbs",
            },
        ],
    });
};
