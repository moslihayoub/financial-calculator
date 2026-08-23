# Configuration Agents & IA

Ce projet utilise des règles strictes définies dans le Master Skill : `.agents/skills/methodology/SKILL.md`.

## Directives
Tout agent IA ou développeur travaillant sur ce projet doit :
1. Lire et respecter le document de méthodologie susmentionné avant d'apporter toute modification.
2. S'assurer que chaque PR / modification respecte les standards de SDD (Spec-Driven Development).
3. Ne jamais manipuler de montants financiers sous forme de floats, utiliser systématiquement la fonction `toCents` et `fromCents`.
4. Éviter toute utilisation du type `any` en Typescript, en validant les données avec Zod.
