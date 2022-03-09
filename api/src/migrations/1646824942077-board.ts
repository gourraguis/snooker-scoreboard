import { MigrationInterface, QueryRunner } from 'typeorm'

export class board1646824942077 implements MigrationInterface {
  name = 'board1646824942077'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "socket_id"`)
    await queryRunner.query(`ALTER TABLE "board" ADD "socket_id" character varying`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" integer`)
    await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "otp"`)
    await queryRunner.query(`ALTER TABLE "owner" ADD "otp" character varying`)
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "socket_id"`)
    await queryRunner.query(`ALTER TABLE "board" ADD "socket_id" character varying`)
  }
}
