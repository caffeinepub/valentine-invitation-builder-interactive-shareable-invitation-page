import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";

actor {
  type Invitation = {
    id : Text;
    title : Text;
    description : Text;
    location : Text;
    date : Text;
    time : Text;
  };

  let invitations = Map.empty<Text, Invitation>();

  public shared ({ caller }) func createInvitation(id : Text, title : Text, description : Text, location : Text, date : Text, time : Text) : async () {
    if (invitations.containsKey(id)) {
      Runtime.trap("An invitation with this ID already exists.");
    };

    let invitation : Invitation = {
      id;
      title;
      description;
      location;
      date;
      time;
    };
    invitations.add(id, invitation);
  };

  public query ({ caller }) func getInvitation(id : Text) : async Invitation {
    switch (invitations.get(id)) {
      case (null) {
        Runtime.trap("Invitation not found");
      };
      case (?invitation) { invitation };
    };
  };

  public query ({ caller }) func getAllInvitations() : async [Invitation] {
    invitations.values().toArray();
  };
};
