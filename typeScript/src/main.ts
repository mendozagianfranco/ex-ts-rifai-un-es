type Chef = {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    birthDate: string;
    gender: string,
    role: string,
    height: number,
    weight: number;
};

type Recipe = {
    id: number,
    name: string,
    userId: number,
    difficulty: string,
    rating: number;
};


function isChef(data: unknown): data is Chef {
    return (
        typeof data === 'object' && data !== null &&
        'id' in data && typeof data.id === 'number' &&
        'firstName' in data && typeof data.firstName === 'string' &&
        'lastName' in data && typeof data.lastName === 'string' &&
        'age' in data && typeof data.age === 'number' &&
        'birthDate' in data && typeof data.birthDate === 'string' &&
        'gender' in data && typeof data.gender === 'string' &&
        'role' in data && typeof data.role === 'string' &&
        'height' in data && typeof data.height === 'number' &&
        'weight' in data && typeof data.weight === 'number'
    );
}

function isRecipe(data: unknown): data is Recipe {
    return (
        typeof data === 'object' && data !== null &&
        'id' in data && typeof data.id === 'number' &&
        'name' in data && typeof data.name === "string" &&
        'userId' in data && typeof data.userId === 'number' &&
        'difficulty' in data && typeof data.difficulty === 'string' &&
        'rating' in data && typeof data.rating === 'number'
    );
}

async function getChefBirthday(id: number): Promise<string | null> {

    try {
        const responseRecipe = await fetch(`https://dummyjson.com/recipes/${id}`);
        const recipe = await responseRecipe.json();
        if (!isRecipe(recipe)) {
            throw new Error('Formato dati Recipe non valido');
        }

        const responseChef = await fetch(`https://dummyjson.com/users/${recipe.userId}`);
        const chef: unknown = await responseChef.json();
        if (!isChef(chef)) {
            throw new Error('Formato dati Chef non valido');
        }

        return chef.birthDate;

    } catch (error) {

        if (error instanceof Error) {
            console.error(error);
        } else {
            console.error('Errore sconosciuto');
        }
        return null;
    }
}

(async () => {
    const birthDateChef = await getChefBirthday(1);
    console.log(birthDateChef);
})();