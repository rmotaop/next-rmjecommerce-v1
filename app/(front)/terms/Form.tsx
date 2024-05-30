"use client";
import Link from "next/link";

const Form = () => {
  return (
    <>
      <h2 className="text-center mt-16">Termos e compromissos</h2>
      <div>
        <h6 className="text-justify">
          RmjEcommerce Terms of Use Version 1.0.0 (03/08/2024) validate
          (03/08/2026(03/08/2024)) <br /> This document contains the general
          terms and conditions of RmjEcommerce B.V., with its principal office
          located at Singel 542, 1017 AZ Amsterdam, the Netherlands and
          registered with the Dutch Chamber of Commerce under registration no.
          71881972 (hereinafter: “RmjEcommerce”). These terms and conditions
          (hereinafter: “Terms and Conditions”) apply to all agreements for the
          provision of services by RmjEcommerce to its users. RmjEcommerce and
          its user may herein individually be referred to as a Party or
          collectively as the Parties. 1. Definitions The capitalized words in
          these Terms and Conditions have the meaning set out below, unless a
          (different) meaning is assigned elsewhere in these Terms and
          Conditions or in the Agreement. 1.1. Account: the account of User
          which provides access to the Platform and allows User to use the
          Service. Unless agreed otherwise, the account is created in the course
          of User providing its login credentials by opting to use its
          (external) account with one of the Third-party Services to complete
          the registration/sign-in procedure described in Article 2.2. 1.2.
          Agreement: the entire agreement between RmjEcommerce, which in any
          case includes, without limitation, RmjEcommerce quotation or offer,
          these Terms and Conditions and any separate written agreements, such
          as a data protection agreement or service level agreement (if
          applicable), concluded between the Parties. 1.3. Consumer: a User,
          being a natural person not acting in the course of its profession or
          business, to which RmjEcommerce provides Services under the Agreement
          for personal use. 1.4. Data Protection Agreement: the data protection
          agreement concluded between the Parties pursuant to the European
          General Data Protection Regulation, attached as Appendix 1. 1.5.
          Documentation: all accompanying materials (whether in hard copy or in
          electronic format) supplied in connection with the Services, including
          manuals, instruction guides, online documentation, any written
          materials accompanying the Services or other materials provided to
          User by RmjEcommerce which describe the functionality and/or
          specifications of the Services. 1.6. Intellectual Property Rights: all
          intellectual property rights and related rights, including but not
          limited to copyrights, database rights, domain name rights, trademark
          rights, brand rights, model rights, neighboring rights, patent rights
          and rights to know-how. 1.7. Office Hours: Monday through Friday,
          between 09.00 and 17.00 CEST, excluding any bank holidays observed in
          the Netherlands, holidays observed and announced by RmjEcommerce, and
          other days of which RmjEcommerce has indicated in advance that its
          offices will be closed. 1.8. Platform: the software-as-a-service
          solution provided by RmjEcommerce under the Agreement, which is
          accessible via the Website. 1.9. Service Plan Offer: RmjEcommerce’s
          offer for Service Plans (i) as presented by RmjEcommerce on the
          Platform and/or Website which User may choose to accept by way of the
          Platform or (ii) as presented in writing in the form of a custom
          proposal by RmjEcommerce on request – leading to the conclusion of a
          new Service Plan between RmjEcommerce and User. 1.10. Service Plan:
          the (sub-agreement) service plan under which Services will be provided
          to User under the Agreement, as indicated in the Service Plan Offer,
          and which forms an inextricable part of the Agreement. Depending on
          the agreed service plan, different features of the Services will be
          made available to Users and different pricing may apply. 1.11.
          Services: the services provided by RmjEcommerce to User under the
          Agreement, including but not limited to the provision of access to the
          Platform. 1.12. Third-Party Services: external services provided by
          third parties which may be (i) required to facilitate the Services or
          (ii) otherwise integrate with the Services. Third-party services
          include but are not limited to GitHub, Apple ID and Google. 1.13. User
          Content: any data and materials stored by or under the responsibility
          of User by way of the Services, or otherwise made available to
          RmjEcommerce by or under responsibility of the User in the context of
          the Agreement – including but not limited to software, source code,
          object code, websites, logos, leaflets, images, texts, video’s, audio
          and personal data within the meaning of the European Data Protection
          Regulation. 1.14. User: the natural person or legal entity to which
          RmjEcommerce provides Services under the Agreement. 1.15. Website:
          https://RmjEcommerce.io/ 2. Formation of the Agreement and Accounts
          2.1. The Agreement is concluded with User’s completion of the
          registration/sign-in procedure for an Account on the Platform, and the
          subsequent receipt by User of a written registration confirmation from
          RmjEcommerce, automated or otherwise. 2.2. User requires an Account to
          access the Services. During Account registration, User is asked to
          provide login credentials by using its (external) account with one of
          the Third-Party Services. User is obliged to use any Accounts in a
          careful manner and to keep its login information secure and strictly
          confidential. RmjEcommerce has the right to assume that all acts
          performed following authentication of these Accounts have been
          performed under the supervision and with the approval of User. User is
          obliged to notify RmjEcommerce immediately if it suspects abuse of
          and/or unauthorized access to its Account. 2.3. Accounts are strictly
          intended for personal use and may not be shared between individuals.
          2.4. The Platform and Services rely on integration with Third-Party
          Services to function. An account with one of the Third-party Services
          is required to register and maintain an Account with RmjEcommerce.
          User acknowledges that loss of access to its account with the
          Third-party Service it used to register its Account with RmjEcommerce,
          will automatically mean loss/deletion of its Account with RmjEcommerce
          and results in User being unable to access all or most of the
          Services. 2.5. In addition to facilitating Accounts, Third-party
          Services may be integrated with Services for other purposes. Such
          integration may only occur if User first registers with the third
          party in question and accepts the relevant terms and conditions
          applicable to those third-party products and/or services. RmjEcommerce
          will in no case be liable or responsible for the (non-)functioning of
          such third-party products and/or services in relation to their
          integration with the Services. 2.6. In the event of any contradictions
          between the different documents comprising the Agreement, the
          following order of precedence shall apply: any additional written
          agreements; the Service Plan Offer; the Data Protection Agreement;
          these Terms and Conditions. 3. Performance of the Agreement 3.1. After
          conclusion of the Agreement, as well as after any additional
          agreements regarding Service Plans as meant in Article 6, RmjEcommerce
          will apply all commercially reasonable efforts to, as soon as
          possible, provide User with access to the relevant Services for the
          duration of the Agreement, in accordance with (if applicable) the
          agreed Service Plan. 3.2. Any deadlines stated by RmjEcommerce are
          always indicative and are not to be considered as strict deadlines
          (“fatale termijnen”).
        </h6>
      </div>
      <div className="">
        <Link className="btn w-36 h-14" href="/seller/simple">
          Voltar
        </Link>
      </div>
    </>
  );
};

export default Form;
