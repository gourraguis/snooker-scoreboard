import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1649901133902 implements MigrationInterface {
  name = 'init1649901133902'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "owner" ("id" character varying NOT NULL, "full_name" character varying NOT NULL, "club_name" character varying NOT NULL, "address" character varying NOT NULL, "balance" integer NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(
      `CREATE TABLE "board" ("id" character varying NOT NULL, "name" character varying NOT NULL, "owner_id" character varying NOT NULL, "socket_id" character varying, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_cd3ee1b689dde31c328d2f0cc8" ON "board" ("owner_id") `)
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" character varying NOT NULL, "name" character varying NOT NULL, "owner_id" character varying NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "updated_date" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_bed1cd091b3dc63b45e6269cb0" ON "manager" ("owner_id") `)
    await queryRunner.query(
      `CREATE TABLE "game" ("id" SERIAL NOT NULL, "board_id" character varying NOT NULL, "manager_id" character varying NOT NULL, "owner_id" character varying NOT NULL, "winner" character varying NOT NULL, "loser" character varying NOT NULL, "started_at" TIMESTAMP NOT NULL, "finished_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`
    )
    await queryRunner.query(`CREATE INDEX "IDX_0152ef021e5a686c048f756ebd" ON "game" ("board_id") `)
    await queryRunner.query(`CREATE INDEX "IDX_89ad405312e41e57426e78057d" ON "game" ("manager_id") `)
    await queryRunner.query(`CREATE INDEX "IDX_678fcc30dbaf1c4c7e86bc10d1" ON "game" ("owner_id") `)
    await queryRunner.query(
      `ALTER TABLE "board" ADD CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "manager" ADD CONSTRAINT "FK_bed1cd091b3dc63b45e6269cb00" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_0152ef021e5a686c048f756ebd3" FOREIGN KEY ("board_id") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_89ad405312e41e57426e78057d6" FOREIGN KEY ("manager_id") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE "game" ADD CONSTRAINT "FK_678fcc30dbaf1c4c7e86bc10d16" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_678fcc30dbaf1c4c7e86bc10d16"`)
    await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_89ad405312e41e57426e78057d6"`)
    await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_0152ef021e5a686c048f756ebd3"`)
    await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_bed1cd091b3dc63b45e6269cb00"`)
    await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_cd3ee1b689dde31c328d2f0cc88"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_678fcc30dbaf1c4c7e86bc10d1"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_89ad405312e41e57426e78057d"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_0152ef021e5a686c048f756ebd"`)
    await queryRunner.query(`DROP TABLE "game"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_bed1cd091b3dc63b45e6269cb0"`)
    await queryRunner.query(`DROP TABLE "manager"`)
    await queryRunner.query(`DROP INDEX "public"."IDX_cd3ee1b689dde31c328d2f0cc8"`)
    await queryRunner.query(`DROP TABLE "board"`)
    await queryRunner.query(`DROP TABLE "owner"`)
  }
}
