export default function ContactCard() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-card/50 backdrop-blur-sm p-5 space-y-2 shadow-lg">
      <h3 className="text-xl font-semibold text-foreground">Group Contact</h3>
      <div className="text-sm text-muted-foreground leading-6 space-y-1">
        <div className="font-medium text-foreground">The Pennsylvania Quantum Public Lobby Group</div>
        <div>832 Marietta Ave.</div>
        <div>Lancaster, PA 17603</div>
        <div>(717)-449-0875</div>
        <div className="text-primary hover:underline">
          <a href="mailto:paquantumpubliclobbygroup@gmail.com">
            paquantumpubliclobbygroup@gmail.com
          </a>
        </div>
        <div className="pt-2 text-xs text-muted-foreground/70">October 9, 2025</div>
      </div>
    </div>
  );
}
