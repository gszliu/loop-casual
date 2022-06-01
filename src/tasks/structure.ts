import { Effect, Familiar, Item, Location, Monster } from "kolmafia";
import { get } from "libram";
import { StringProperty } from "libram/dist/propertyTypes";
import { CombatStrategy } from "../combat";
import { OverridePriority } from "../priority";

export type Quest = {
  name: string;
  tasks: Task[];
};

export type AcquireItem = {
  item: Item;
  num?: number;
  price?: number;
  useful?: () => boolean;
  optional?: boolean;
};

export type Limit = {
  tries?: number;
  turns?: number;
  soft?: number;
  message?: string;
};

export interface OutfitSpec {
  equip?: Item[]; // Items to be equipped in any slot
  modifier?: string; // Modifier to maximize
  familiar?: Familiar; // Familiar to use
  avoid?: Item[]; // Items that cause issues and so should not be equipped
}

export type Task = {
  name: string;
  after: string[];
  ready?: () => boolean;
  priority?: () => OverridePriority;
  prepare?: () => void;
  completed: () => boolean;
  do: Location | (() => void);
  post?: () => void;
  choices?: { [id: number]: number | (() => number) };
  combat?: CombatStrategy;
  outfit?: OutfitSpec | (() => OutfitSpec);
  effects?: Effect[];
  acquire?: AcquireItem[];
  delay?: number | (() => number);
  freeaction?: boolean | (() => boolean);
  freecombat?: boolean;
  limit: Limit;

  // The monsters to search for with orb.
  // In addition, absorb targets are always searched with the orb.
  // If not given, monsters to search for are based on the CombatStrategy
  orbtargets?: () => Monster[];
};

export function step(questName: StringProperty): number {
  const stringStep = get(questName);
  if (stringStep === "unstarted") return -1;
  else if (stringStep === "started") return 0;
  else if (stringStep === "finished") return 999;
  else {
    if (stringStep.substring(0, 4) !== "step") {
      throw "Quest state parsing error.";
    }
    return parseInt(stringStep.substring(4), 10);
  }
}
