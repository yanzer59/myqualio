"use client";

interface Props {
  data: Record<string, string>;
  onUpdate: (field: string, value: string) => void;
}

export default function DocGeneric({ }: Props) {
  return (
    <div className="text-center py-12">
      <div className="text-5xl mb-4">🚧</div>
      <h3 className="text-lg font-semibold text-dark mb-2">Document en cours de développement</h3>
      <p className="text-sm text-gray-text">
        Ce formulaire sera disponible prochainement avec les champs spécifiques à ce document.
      </p>
    </div>
  );
}
