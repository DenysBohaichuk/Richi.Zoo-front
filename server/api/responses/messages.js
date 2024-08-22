export const responseMessages ={
    async getMessage(dataPromise) {
        try {
            const data = await dataPromise; // Очікування на результат промісу
            if (data && data.hasOwnProperty('data')) {
                return data.data;
            } else if (data && data.hasOwnProperty('error')) {
                return data.error.message;
            } else {
                // Логіка для ситуації, коли проміс не повертає об'єкт з властивостями data або error
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }
}