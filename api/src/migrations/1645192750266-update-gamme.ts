import { MigrationInterface, QueryRunner } from 'typeorm'

export class updateGamme1645192750266 implements MigrationInterface {
  name = 'updateGamme1645192750266'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "player1"`)
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "player2"`)
    await queryRunner.query(`ALTER TABLE "game" ADD "winner" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "game" ADD "loser" character varying NOT NULL`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "loser"`)
    await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "winner"`)
    await queryRunner.query(`ALTER TABLE "game" ADD "player2" character varying NOT NULL`)
    await queryRunner.query(`ALTER TABLE "game" ADD "player1" character varying NOT NULL`)
  }
}
