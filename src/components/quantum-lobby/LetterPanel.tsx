const letter = `Dear lawmaker,

We're an emergency workgroup of students and engineers in the sciences. Our goal is to illustrate and achieve a prosperous quantum era for Pennsylvania.

Pennsylvania needs a broad-based quantum initiative to capitalize on our position in technology so we can boost the next generation's success, increase efficiency, and provide more for our commonwealth. Quantum technology has the potential to improve our quality of life dramatically, but it doesn't have to happen; it's not inevitable. Today, dollars are falling out of Pennsylvanians' pockets as we fight this trade war and the world loses faith that we can keep the train on the tracks. We must craft frequent plans with goals that build up our economy from its foundations.

Luckily, we aren't trying to find our way in the dark; many states have formed their own quantum initiatives. The best state quantum initiatives have set goals and a process for selecting a Quantum Initiative Advisory Board that drafts plans to achieve those goals. State quantum initiatives also create mechanisms for funding quantum plans. There are many ethical concerns related to using quantum technologies and algorithms, so we recommend establishing a Quantum Ethics and Governance Commission.

Pennsylvania invented the ambulance, the polio vaccine, and the digital computer. Let's grasp this opportunity to bring quantum technologies to our commonwealth.

Sincerely yours,
Erin Tygart Richard`;

export default function LetterPanel() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-6 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-foreground">Public Letter</h3>
      <pre className="whitespace-pre-wrap text-sm text-foreground/90 leading-7 font-sans">{letter}</pre>
    </div>
  );
}
