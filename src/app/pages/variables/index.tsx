"use client";

import VariablesComponent from "@/app/components/Variables/Variable";
import withAuth from "@/app/components/withAuth";
import React from "react";

function Variables() {
  return (
    <div>
      <div>
        <h1>Variables</h1>
        <VariablesComponent />
      </div>
    </div>
  );
}

export default withAuth(Variables);
