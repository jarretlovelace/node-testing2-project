exports.seed = function(knex) {
  return knex('users').del()
    .then(() => {
      return knex('users').insert([
        { name: 'John Doe', email: 'john.doe@example.com' },
        { name: 'Jane Doe', email: 'jane.doe@example.com' },
      ]);
    });
};
