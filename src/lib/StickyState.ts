import { Entity, entity } from 'simpler-state';

const entities: Record<string, { savedEntity: Entity<any>; savedSetter: (value: any) => void }> = {};

// eslint-disable-next-line import/prefer-default-export
export const useStickyState = (name: string, initialValue: any) => {
  if (entities[name]) {
    const { savedEntity, savedSetter } = entities[name];
    return [savedEntity.use(), savedSetter];
  }
  // Otherwise create a new entity
  const newEntity = entity(initialValue);
  const newEntitySetter = (newValue: unknown) => newEntity.set(newValue);
  entities[name] = { savedEntity: newEntity, savedSetter: newEntitySetter };
  return [newEntity.use(), newEntitySetter];
};
