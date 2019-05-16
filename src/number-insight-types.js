const { gql } = require('apollo-server');

module.exports = gql`
  type Insight {
    status: Int!
    status_message: String
    request_id: String
    international_format_number: String
    country_code: String
    country_code_iso3: String
    country_name: String
    country_prefix: String
    request_price: String
    refund_price: String
    remaining_balance: String
    ported: String
    current_carrier: Carrier
    original_carrier: OriginalCarrier
    roaming: Roaming
    lookup_outcome: String
    lookup_outcome_message: String
    valid_number: String
    reachable: String
    caller_identity: Caller
    ip: Ip
    ip_warnings: String
  }

  type Carrier {
    network_code: String
    name: String
    country: String
    network_type: String
  }

  type OriginalCarrier {
    network_code: String
    name: String
    country: String
    network_type: String
  }

  type Roaming {
    status: String!
    roaming_country_code: String
    roaming_network_code: Int
    roaming_network_name: String
  }

  type Caller {
    caller_type: String
    caller_name: String
    first_name: String
    last_name: String
  }

  type Ip {
    address: String
    ip_match_level: String
    ip_country: String
    ip_city: String
  }

  type Query {
    "Get details about a number"
    insight(number: String!, type: String, cnam: Boolean, ip: String): Insight
  }
`;
