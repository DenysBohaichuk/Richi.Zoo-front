/**
 * Об'єкт який обробляє відповідь в залежності від того чи успішна вона чи ні
 */

export const responseFormat = {
    response(struct) {
        if (struct == null || typeof struct !== 'object') {
            console.warn('[responseFormat] отримано не-обʼєкт:', struct);
            return struct;
        }

        if (Object.prototype.hasOwnProperty.call(struct, 'response')) {
            const responseData = struct.response.data;

            // Check if error.message is present and is not just a string
            if (responseData.error && typeof responseData.error.message === 'object') {
                // Extract the error messages and join them with a line break
                const messages = Object.values(responseData.error.message).flat();
                responseData.error.message = messages.join('\n');
            }
            return responseData;
        } else if (Object.prototype.hasOwnProperty.call(struct, 'status')) {

            return struct;
        }
        return struct;
    }
};
