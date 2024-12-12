import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Contact } from '../entities/contacts.entity';
import * as bcrypt from 'bcrypt';

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'contacts-directory',
  entities: [User, Contact],
  synchronize: true,
});

async function populateDummyData() {
  await dataSource.initialize();
  const userRepository = dataSource.getRepository(User);
  const contactRepository = dataSource.getRepository(Contact);

  // Create users
  const users = [
    {
      name: 'Alice',
      phoneNumber: '1234567890',
      email: 'alice@example.com',
      password: 'alice_password',
    },
    {
      name: 'Bob',
      phoneNumber: '0987654321',
      email: 'bob@example.com',
      password: 'bob_password',
    },
    {
      name: 'Charlie',
      phoneNumber: '1112223333',
      email: 'charlie@example.com',
      password: 'charlie_password',
    },
  ];

  for (const userData of users) {
    userData.password = await bcrypt.hash(userData.password, 10);
    const user = userRepository.create(userData);
    await userRepository.save(user);

    // Add contacts for each user
    const contacts = [
      { name: 'David', phoneNumber: '4445556666', owner: user },
      { name: 'Eve', phoneNumber: '7778889999', owner: user },
    ];
    for (const contactData of contacts) {
      const contact = contactRepository.create(contactData);
      await contactRepository.save(contact);
    }
  }

  console.log('Dummy data populated successfully!');
  await dataSource.destroy();
}

populateDummyData().catch((error) => {
  console.error('Error populating dummy data:', error);
});
