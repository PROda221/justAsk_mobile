import { schemaMigrations, createTable, addColumns } from '@nozbe/watermelondb/Schema/migrations';

export const migrations = schemaMigrations({
  migrations: [
    {
      // Updating from version 2 to 3
      toVersion: 3,
      steps: [
        // Step 2: Add the new 'status' column to the 'messages' table
        addColumns({
          table: 'messages',
          columns: [
            { name: 'status', type: 'string', isIndexed: true }, // New column added to 'messages'
          ],
        }),

        // Step 3: Create the new 'notifications' table
        createTable({
          name: 'notifications',
          columns: [
            { name: 'sender', type: 'string' }, // New column in 'notifications' table
          ],
        }),
      ],
    },
  ],
});
