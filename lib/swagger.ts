import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Expense Management API",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    tags: [
      {
        name: "Authentication",
        description: "Authentication related APIs",
      },
      {
        name: "Transactions",
        description: "Transaction management APIs",
      },
      {
        name: "Goals",
        description: "Goals management APIs",
      },
      {
        name: "Dashboard",
        description: "Dashboard analytics APIs",
      },
    ],
  },

  apis: ["./app/api/**/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);