import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1697863954374 implements MigrationInterface {
    name = 'Init1697863954374'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."earring_status_enum" AS ENUM('CREATED', 'IN_PROGRESS', 'NOT_COMPLETED', 'FINISH')`);
        await queryRunner.query(`CREATE TABLE "earring" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "earring_name" character varying NOT NULL, "earring_description" character varying NOT NULL, "status" "public"."earring_status_enum" NOT NULL, "responsible_name" character varying NOT NULL, "reservation_id" uuid, CONSTRAINT "PK_04fe97471175abec54a3725e62c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "earring" ADD CONSTRAINT "FK_27c5816bdfd852115495c4a4619" FOREIGN KEY ("reservation_id") REFERENCES "reservations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "earring" DROP CONSTRAINT "FK_27c5816bdfd852115495c4a4619"`);
        await queryRunner.query(`DROP TABLE "earring"`);
        await queryRunner.query(`DROP TYPE "public"."earring_status_enum"`);
    }

}
