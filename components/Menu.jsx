"use client";
import { useStore } from '@/hooks/useStore';
import { useRouter } from 'next/navigation';  // Changed from 'next/navigation'

export const Menu = () => {
    const router = useRouter();
    const [saveWorld, resetWorld] = useStore((state) => {
        if (!state) return [() => {}, () => {}];  // Default functions if state is undefined
        return [state.saveWorld, state.resetWorld];
    });

    const handleSave = async () => {
        await saveWorld();
        router.refresh("/");  // Reloads the page
    };

    return (
        <div className="menu absolute">
            <button onClick={handleSave}>Save</button>
            <button onClick={resetWorld}>Reset</button>
        </div>
    );
};
