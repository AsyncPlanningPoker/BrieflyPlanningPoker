import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'
import { PrismaExtended } from '../prisma-client';

// beforeEach(() => {
//   mockReset(prisma)
// });

const prisma = mockDeep<PrismaExtended>();
export default prisma;