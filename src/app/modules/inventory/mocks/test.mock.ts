export const MOCK_INVENTORY_STATE = {
    inventoryItems: {
        ids: [1, 2, 3],
        entities: {
            1: {
                id: 1,
                name: 'First',
                amount: 1,
                createdAt: new Date(),
                lastUpdatedAt: new Date()
            },
            2: {
                id: 2,
                name: 'Second',
                amount: 5,
                createdAt: new Date(),
                lastUpdatedAt: new Date()
            },
            3: {
                id: 3,
                name: 'Third',
                amount: 0,
                createdAt: new Date(),
                lastUpdatedAt: new Date()
            },
        }
    }
};