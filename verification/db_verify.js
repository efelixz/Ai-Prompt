const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const promptCount = await prisma.prompt.count();
    console.log('Prompts in DB:', promptCount);
    process.exit(0);
  } catch (e) {
    console.error('DB Connection Failed (Expected in this sandbox without local PG):', e.message);
    process.exit(0);
  }
}

main();
