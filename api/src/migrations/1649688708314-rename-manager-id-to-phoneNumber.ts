import { MigrationInterface, QueryRunner } from 'typeorm'

export class renameManagerIdToPhoneNumber1649688708314 implements MigrationInterface {
  name = 'renameManagerIdToPhoneNumber1649688708314'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "manager" RENAME COLUMN "id" TO "phone_number"`)
    await queryRunner.query(
      `ALTER TABLE "manager" RENAME CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" TO "PK_2650cc1d6706b9dc2b14774c41a"`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "manager" RENAME CONSTRAINT "PK_2650cc1d6706b9dc2b14774c41a" TO "PK_b3ac840005ee4ed76a7f1c51d01"`
    )
    await queryRunner.query(`ALTER TABLE "manager" RENAME COLUMN "phone_number" TO "id"`)
  }
}
