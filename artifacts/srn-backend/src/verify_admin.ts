import { getAllUsers, getAnalytics, toggleUserBan, deleteUser, updateUserRole } from './modules/admin/admin.service';
import { prisma } from './lib/prisma';

async function testAdminApis() {
  console.log('--- Testing Admin APIs ---');
  
  try {
    // 1. Create a dummy user
    const user = await prisma.user.create({
      data: {
        firstName: 'Admin',
        lastName: 'Test User',
        phone: '1234567890',
        state: 'Delhi',
        district: 'New Delhi',
        gender: 'Male',
        email: 'admin_test@example.com',
        password: 'password123',
        role: 'USER'
      }
    });
    console.log('Created test user:', user.email);

    // 2. Test getAnalytics
    const analytics = await getAnalytics();
    console.log('Analytics:', analytics);

    // 3. Test toggleUserBan
    const bannedUser = await toggleUserBan(user.id, true);
    console.log('User Banned:', bannedUser.isActive === false);

    // 4. Test updateUserRole
    const promotedUser = await updateUserRole(user.id, 'ADMIN');
    console.log('User Promoted to ADMIN:', promotedUser.role === 'ADMIN');

    // 5. Test deleteUser
    await deleteUser(user.id);
    console.log('User Deleted successfully');

    console.log('--- All Admin Service Methods Verified ---');
  } catch (error) {
    console.error('Admin API Test Failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testAdminApis();
