import { MigrationInterface, QueryRunner } from 'typeorm'

export class setNullableBoardOwner1644488194940 implements MigrationInterface {
  name = 'setNullableBoardOwner1644488194940'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "owner" DROP NOT NULL`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
    await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "owner" DROP NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "owner" SET NOT NULL`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
    await queryRunner.query(`ALTER TABLE "board" ALTER COLUMN "owner" SET NOT NULL`)
  }
}
