import { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SandboxPanelProps {
  title: string;
  description: string;
  code: string;
  language?: string;
  output?: string;
  color?: string;
}

const quantumExamples = {
  students: `# Pennsylvania Quantum Workforce Training
# Basic Quantum Circuit Example

from qiskit import QuantumCircuit, execute, Aer

# Create a quantum circuit with 2 qubits
qc = QuantumCircuit(2)

# Apply Hadamard gate to qubit 0
qc.h(0)

# Apply CNOT gate
qc.cx(0, 1)

# Measure both qubits
qc.measure_all()

# Simulate
simulator = Aer.get_backend('qasm_simulator')
result = execute(qc, simulator, shots=1000).result()
counts = result.get_counts()

print("Bell State Results:", counts)`,

  energy: `# Quantum Grid Optimization
# Simulating energy distribution

import numpy as np
from scipy.optimize import minimize

# Grid nodes with demand
demand = np.array([120, 85, 95, 110, 78])
capacity = np.array([150, 100, 100, 120, 90])

def optimize_distribution(supply):
    # Minimize transmission losses
    loss = np.sum((supply - demand) ** 2)
    return loss

# Constraint: total supply
result = minimize(
    optimize_distribution,
    x0=demand,
    bounds=[(0, c) for c in capacity],
    method='SLSQP'
)

print("Optimized Distribution:")
print("Energy Savings:", result.fun, "kWh")
print("Grid Efficiency:", (1 - result.fun/sum(demand))*100, "%")`,

  healthcare: `# Quantum Drug Discovery Simulation
# Molecular property prediction

from qiskit.chemistry import FermionicOperator
from qiskit.aqua.algorithms import VQE

# Simulate H2 molecule
def simulate_molecule():
    # Define molecular Hamiltonian
    # (simplified for demo)
    
    energy_levels = [-1.137, -0.475, 0.347, 1.098]
    
    print("Molecular Energy Levels (Hartree):")
    for i, E in enumerate(energy_levels):
        print("  State", i, ":", E)
    
    # Ground state energy
    E_ground = min(energy_levels)
    print("Ground State:", E_ground, "Hartree")
    print("Drug binding affinity:", abs(E_ground)*627.5, "kcal/mol")

simulate_molecule()`,

  governance: `# Quantum Policy Impact Simulator
# Economic modeling with quantum algorithms

import numpy as np
from dataclasses import dataclass

@dataclass
class PolicyImpact:
    sector: str
    investment: float
    roi_multiplier: float
    jobs_created: int
    
policies = [
    PolicyImpact("Education", 10000000, 4.3, 450),
    PolicyImpact("Energy", 15000000, 3.8, 320),
    PolicyImpact("Healthcare", 12000000, 3.2, 280),
    PolicyImpact("Infrastructure", 8000000, 5.1, 510),
]

total_investment = sum(p.investment for p in policies)
total_return = sum(p.investment * p.roi_multiplier for p in policies)
total_jobs = sum(p.jobs_created for p in policies)

print("Pennsylvania Quantum Initiative Impact:")
print("  Total Investment:", total_investment)
print("  Expected Return:", total_return)
print("  ROI:", (total_return/total_investment))
print("  Jobs Created:", total_jobs)
print("  Economic Multiplier:", total_jobs/total_investment*1e6, "jobs per million")`,
};

export const SandboxPanel = ({
  title,
  description,
  code,
  language = "python",
  output,
  color = "primary",
}: SandboxPanelProps) => {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Code copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setShowOutput(true);
    setTimeout(() => {
      setIsRunning(false);
      toast.success("Code executed successfully");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card className={cn(
        "glass-card-3d overflow-hidden group",
        "hover:shadow-lg transition-all duration-300"
      )}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className={cn(
                "text-base sm:text-lg font-bold",
                `text-${color}`
              )}>
                {title}
              </CardTitle>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                {description}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="h-8 w-8 p-0"
                aria-label="Copy code"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-success" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="sm"
                onClick={handleRun}
                disabled={isRunning}
                className="h-8 px-3 btn-3d-primary"
                aria-label="Run code"
              >
                <Play className="h-3 w-3 mr-1" />
                Run
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t border-border/50">
            <Editor
              height="300px"
              language={language}
              value={code}
              theme="vs-dark"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                fontSize: 12,
                lineNumbers: "on",
                glyphMargin: false,
                folding: false,
                lineDecorationsWidth: 10,
                lineNumbersMinChars: 3,
              }}
            />
          </div>
          
          {showOutput && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="border-t border-border/50 bg-background/50 p-4"
            >
              <div className="text-xs font-mono">
                <div className="text-success mb-2">
                  {isRunning ? "► Running..." : "✓ Execution complete"}
                </div>
                <pre className="text-muted-foreground whitespace-pre-wrap">
                  {output || "Output displayed here..."}
                </pre>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export const sandboxExamples = quantumExamples;
