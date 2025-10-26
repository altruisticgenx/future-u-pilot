export const MOCK = {
  bills: [
    { 
      id:"HB-101", 
      title:"School Transportation Safety Act", 
      subjects:["education"], 
      when:"2025-03-12", 
      summary:"Funds safer school buses and routes.",
      status: "active",
      jurisdiction: "Pennsylvania"
    },
    { 
      id:"SB-202", 
      title:"Clean Energy District Grants", 
      subjects:["energy"], 
      when:"2025-05-02", 
      summary:"Supports municipal solar + storage.",
      status: "active",
      jurisdiction: "Pennsylvania"
    },
    { 
      id:"HB-303", 
      title:"Hospital Cyber Resilience", 
      subjects:["health","cybersecurity"], 
      when:"2025-04-15", 
      summary:"Grants for hospital cybersecurity.",
      status: "active",
      jurisdiction: "Pennsylvania"
    },
    {
      id: "HB-405",
      title: "Rural Broadband Infrastructure Act",
      subjects: ["technology", "rural"],
      when: "2025-02-28",
      summary: "Expands high-speed internet access to underserved rural communities.",
      status: "committee",
      jurisdiction: "Pennsylvania"
    }
  ],
  budget_lines: [
    { 
      id:"B-EDU-25", 
      program:"Basic Education Transportation", 
      subjects:["education"], 
      fy:2025, 
      amount:7100000000,
      agency: "Department of Education",
      state: "PA"
    },
    { 
      id:"B-EN-25", 
      program:"Community Solar + Storage Block", 
      subjects:["energy"], 
      fy:2025, 
      amount:150000000,
      agency: "Department of Environmental Protection",
      state: "PA"
    },
    { 
      id:"B-HLTH-25", 
      program:"Hospital Modernization + Cyber", 
      subjects:["health","cybersecurity"], 
      fy:2025, 
      amount:85000000,
      agency: "Department of Health",
      state: "PA"
    },
    {
      id: "B-TECH-25",
      program: "Rural Broadband Infrastructure Fund",
      subjects: ["technology", "rural"],
      fy: 2025,
      amount: 250000000,
      agency: "Pennsylvania Broadband Development Authority",
      state: "PA"
    }
  ],
  projects: [
    { 
      id:"P-001", 
      title:"District 12 Electric Buses", 
      subjects:["education","energy"], 
      amount:2500000, 
      recipient:"River Valley SD", 
      when:"2025-06-20",
      kind: "grant",
      agency: "Department of Transportation"
    },
    { 
      id:"P-002", 
      title:"City Hall Microgrid", 
      subjects:["energy"], 
      amount:5800000, 
      recipient:"City of Fairview", 
      when:"2025-07-03",
      kind: "grant",
      agency: "Department of Energy"
    },
    { 
      id:"P-003", 
      title:"Rural Hospital EDR Upgrade", 
      subjects:["health","cybersecurity"], 
      amount:900000, 
      recipient:"Pine County Health", 
      when:"2025-02-11",
      kind: "contract",
      agency: "Department of Health and Human Services"
    },
    {
      id: "P-004",
      title: "Mountain Valley Fiber Network",
      subjects: ["technology", "rural"],
      amount: 12000000,
      recipient: "Mountain Valley Communications",
      when: "2025-04-15",
      kind: "contract",
      agency: "USDA Rural Development"
    }
  ],
  lobby: [
    { 
      id:"L-001", 
      client:"PA Assoc. of School Business", 
      issues:["education"], 
      mentions:["HB-101"], 
      quarter:"2025Q2",
      registrant: "Capitol Strategies LLC"
    },
    { 
      id:"L-002", 
      client:"State Solar Coalition", 
      issues:["energy"], 
      mentions:["SB-202"], 
      quarter:"2025Q2",
      registrant: "Energy Policy Group"
    },
    { 
      id:"L-003", 
      client:"Hospital Alliance", 
      issues:["health","cybersecurity"], 
      mentions:["HB-303"], 
      quarter:"2025Q1",
      registrant: "Healthcare Advocates"
    },
    {
      id: "L-004",
      client: "Rural Internet Service Providers",
      issues: ["technology", "rural"],
      mentions: ["HB-405"],
      quarter: "2025Q1",
      registrant: "Telecom Policy Partners"
    }
  ]
};

export type Kind = "bill"|"budget"|"project"|"lobby";

export function kindArray(k: Kind) {
  return k==="bill" ? MOCK.bills :
         k==="budget" ? MOCK.budget_lines :
         k==="project" ? MOCK.projects : MOCK.lobby;
}

export function findEntity(kind: Kind, id: string) {
  return kindArray(kind).find((x: any) => x.id === id);
}