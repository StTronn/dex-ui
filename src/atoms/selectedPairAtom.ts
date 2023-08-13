import { Pairs } from '@/constants';
import { atom } from 'jotai';

export const selectedPairAtom = atom<Pairs>("INR/SGD");  // Initializing with a default pair
