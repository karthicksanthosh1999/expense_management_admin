import { swaggerSpec } from "@/lib/swagger";
import SwaggerClientPage from "./SwaggerClientPage";

export default function ApiDocsPage() {
  return (
    <div>
      <SwaggerClientPage spec={swaggerSpec} />
    </div>
  );
}