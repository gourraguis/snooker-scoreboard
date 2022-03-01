import { MigrationInterface, QueryRunner } from 'typeorm'

export class addSockerId1646048718448 implements MigrationInterface {
  name = 'addSockerId1646048718448'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" ADD "socket_id" character varying`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "socket_id"`)
  }
}
