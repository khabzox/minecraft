// components/Cubes.js
import { useStore } from '@/hooks/useStore';
import { Cube } from './Cube';

export const Cubes = () => {
    const [cubes] = useStore((state) => {
        if (!state) {
            console.error('State is undefined');
            return [[]]; // Return an empty array if state is undefined
        }
        return [state.cubes];
    });

    console.log('Cubes:', cubes); // Debugging log to check cubes data

    return cubes.map(({ key, pos, texture }) => (
        <Cube key={key} position={pos} texture={texture} />
    ));
};
