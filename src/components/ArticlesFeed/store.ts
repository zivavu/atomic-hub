import { atom } from 'nanostores';

export const selectedTagsAtom = atom<string[]>([]);
export const setSelectedTags = (tags: string[]) => selectedTagsAtom.set(tags);
