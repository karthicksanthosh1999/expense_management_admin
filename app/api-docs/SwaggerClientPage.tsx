"use client";

import SwaggerUI from "swagger-ui-react";

type Props = {
  spec: any;
};

export default function SwaggerClientPage({ spec }: Props) {
  return <SwaggerUI spec={spec} />;
}